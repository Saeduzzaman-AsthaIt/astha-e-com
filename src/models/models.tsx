import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'

// export interface ItemSet {
//     // _id: string,
//     albumId: number,
//     title: string,
//     url: string,
//     thumbnailUrl: string,
//     id: string;
//     // images: ISetImage;
//     images: any;
//     // legalities: ILegality;
//     legalities: any;
//     name:  string;
//     printedTotal: number;
//     ptcgoCode: string;
//     releaseDate: string;
//     series:  string;
//     total: number;
//     updatedAt: string;
// }

export interface ItemSetUpdate {
    _id: string,
    name:  string;
    age: number
}


// export interface QuickViewProps {
//     isModalVisible: boolean,
//     item: ItemSet | null | undefined,
//     isLoading: boolean,
//     error: string,
//     // showModal: (id: number) => void,
//     onModalCancel: () => void,
//     onItemAddedToCart: (e: React.MouseEvent<HTMLButtonElement>) => void
// }