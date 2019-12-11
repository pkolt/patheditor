import React from 'react';
import PropTypes from 'prop-types';
import {YMaps, Map as YMap, Placemark} from 'react-yandex-maps';

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

    return <YMaps query={ymQuery}>
                <YMap state={mState} width="">
                    {items.map((item) => {
                        return <Placemark
                                    key={item.id}
                                    defaultGeometry={item.point}
                                    properties={{
                                        balloonContentBody: item.title,
                                    }}
                                />
                    })}
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