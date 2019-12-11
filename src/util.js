const apikey = 'b5ca0b9b-9f4b-4cbf-bcbf-f562a8297253';

export const searchPoint = async (value) => {
    try {
        const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${apikey}&results=1&format=json&geocode=${value}`);
        const data = await response.json();
        const geoObjects = data.response.GeoObjectCollection.featureMember;
        const points = geoObjects.map((obj) => {
          const pos = obj.GeoObject.Point.pos;
          const geometry = pos.split(' ').map(parseFloat).reverse();
          return geometry;
        });
        return points[0];
    } catch(error) {
        console.error(error);
    }
}