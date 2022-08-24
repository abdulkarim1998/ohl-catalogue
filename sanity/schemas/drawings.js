export default {
    name: 'drawings',
    title: 'Drawings',
    type: 'document',
    fields: [
        {
            name: 'drawingNumber',
            title: 'Drawing Number',
            type: "string"
        },
        {
            name: 'drawingName',
            title: 'Drawing Name',
            type: "string"
        },
        {
            name: 'imageurl',
            title: 'ImgURL',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
        {
            name: "pdf",
            title: "PDF file",
            type: "file"
        },
        {
            name: 'itemsNumbers',
            title: 'Items Numbers',
            type: 'array',
            of: [{type: 'string'}]
        },
        {
            name: 'sapNumber',
            title: 'SAP Number',
            type: "string"
        },
        {
            name: 'hookupNo',
            title: 'Hook Up Number',
            type: "string"
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string'
        }
    ]
}