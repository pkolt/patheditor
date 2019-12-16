import React from 'react';
import PropTypes from 'prop-types';
import {YMaps, Map as YMap, Placemark, Polyline} from 'react-yandex-maps';

const Map = (props) => {
    const {centerPoint, items, onChangeItemPoint} = props;
    const ymQuery = {
        ns: 'use-load-option',
        load: 'Map,Placemark,control.ZoomControl,geoObject.addon.balloon',
    };
    const mState = {
        center: centerPoint, 
        zoom: 10, 
        controls: ['zoomControl']
    };
    const plGeometry = items.map(item => item.point);

    return <YMaps query={ymQuery}>
                <YMap state={mState} width="" height={600}>
                    {items.map((item) => <Placemark
                                            key={item.id}
                                            defaultGeometry={item.point}
                                            options={{draggable: true}}
                                            properties={{balloonContentHeader: item.title}}
                                            onDragEnd={(event) => {
                                                const point = event.get('target').geometry.getCoordinates();
                                                onChangeItemPoint(item.id, point);
                                            }}
                                        />
                    )}
                    <Polyline
                        geometry={plGeometry}
                        options={{
                            balloonCloseButton: false,
                            strokeColor: '#ff0000',
                            strokeWidth: 2
                        }}
                        />
                </YMap>
    </YMaps>;
}

Map.propTypes = {
    items: PropTypes.array.isRequired,
    onChangeItemPoint: PropTypes.func.isRequired,
    centerPoint: PropTypes.array.isRequired
};

export default React.memo(Map);