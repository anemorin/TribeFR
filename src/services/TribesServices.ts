import { TribeType, UserType } from "../types/TribesTypes";
import { ApiConnection } from "./ApiConnection";

class TribesServices {
  static async GetTribes() {
    const response = await ApiConnection.get<TribeType[]>('tribes/get-all');
    return response;
  }

  static async CreateTribe(creatorId: string, name: string) {
    const response = await ApiConnection.post<TribeType>('tribes/create',
      {
        creatorId,
        name,
        positions: [{
          userId: creatorId,
          parentIds: [],
          childrenIds: []
        }],
        participantsIds: []
      }
    );
    return response;
  }

  static async GetUsers(userIds: string[]) {
    const response = await ApiConnection.get<UserType[]>(`users/by-ids?${userIds.map((id) => `userIds=${id}`).join('&')}`);
    return response;
  }

  static async GetUsersByName(name: string) {
    const response = await ApiConnection.get<UserType[]>(`users/search-by-name?searchString=${name}`);
    return response;
  }

  static async ChangeName(tribeId: string, newName: string) {
    const response = await ApiConnection.put(`tribes/change-name`, {tribeId, newName});
    return response;
  }

  static async DeleteTribe(tribeId: string)  {
    const response  = await ApiConnection.delete(`tribes/delete/${tribeId}`);
    return response;
  }

  static async AddUserToTribe(tribeId: string, userId: string, currentUserId: string)  {
    const response  = await ApiConnection.put(`tribes/add-user`, {
      tribeId,
      userId,
      leads: [
        currentUserId
      ],
      subordinates: []
    });
    return response;
  }
}

export { TribesServices };