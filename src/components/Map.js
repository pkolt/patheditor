import React from 'react';
import PropTypes from 'prop-types';
import {YMaps, Map as YMap, Placemark, Polyline} from 'react-yandex-maps';

const Map = (props) => {
    const {items} = props;
    const ymQuery = {
        ns: 'use-load-option',
        load: 'Map,Placemark,control.ZoomControl,geoObject.addon.balloon',
    };
    const moscowPoint = [55.75, 37.57];
    const firstPoint = items[0] && items[0].point;
    const mState = {
        center: firstPoint || moscowPoint, 
        zoom: 10, 
        controls: ['zoomControl']
    };
    const plGeometry = items.map(item => item.point);

    return <YMaps query={ymQuery}>
                <YMap state={mState} width="" height={600}>
                    {items.map((item) => <Placemark
                                            key={item.id}
                                            defaultGeometry={item.point}
                                            properties={{
                                                balloonContentBody: item.title,
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
    items: PropTypes.array
};

Map.defaultProps = {
    items: []
};

export default React.memo(Map);