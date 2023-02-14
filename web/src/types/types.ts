interface Image {
    _type: string
    asset: { _ref: string, _type: string }
    crop: { _type: string, bottom: number, left: number, right: number, top: number }
    hotspot: { _type: string, height: number, width: number, x: number, y: number }
}

interface PDF {
    _type: string
    asset: { _ref: string, _type: string }

}

export interface Material {
    hookupNo: string
    imageurl: Image
    itemID: string
    materialDescription: string
    materialName: string
    sapNumber: string
    unit: string
}

export interface Drawing {
    description: string
    drawingName: string
    drawingNumber: string
    itemsNumbers: string[]
    pdf: PDF
}


export interface SmallerMaterials {
    id: string
    name: string
}