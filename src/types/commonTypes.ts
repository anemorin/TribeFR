export type WithValidation = {
  validate(): string | undefined;
};

export enum TitleType {
  PageTitle,
  SubTitle,
  CardTitle,
}

export enum StatusType  {
  Created,
  Processing,
  Complete
}