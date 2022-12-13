export default {
    name: 'materials',
    title: 'Materials',
    type: 'document',
    fields: [
        {
            name: 'materialName',
            title: 'Material Name',
            type: "string"
        },
        {
            name: 'itemID',
            title: 'Item ID',
            type: "string"
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
            name: 'materialDescription',
            title: 'Material Description',
            type: "string"
        },
        {
            name: 'unit',
            title: 'Unit',
            type: "string"
        },
        {
            name: 'remarks',
            title: 'Remarks',
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
            name: 'AVME',
            title: 'AVME',
            type: 'array',
            of: [{type: 'string'}]
        },
    ]
}