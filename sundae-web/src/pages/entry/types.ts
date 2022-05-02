export interface OptionItem {
  name: string;
  imagePath: string;
}

export interface OptionItemProps extends OptionItem {
  updateItemCount: (name: string, value: number) => void;
}
