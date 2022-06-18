export default {
    name: 'items',
    title: 'Items',
    type: 'document',
    fields: [
        {
            name: 'itemName',
            title: 'Item Name',
            type: "string"
        },
        {
            name: 'imageurl',
            title: 'ImgURL',
            type: 'image',
            options: {
                hotspot: true,
            }
        }
    ]
}