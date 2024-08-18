export interface ItemSet {
    id: number,
    albumId: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}

export interface QuickViewProps {
    isModalVisible: boolean,
    item: ItemSet | null | undefined,
    isLoading: boolean,
    error: string,
    // showModal: (id: number) => void,
    onModalCancel: () => void,
    onItemAddedToCart: (e: React.MouseEvent<HTMLButtonElement>) => void
}