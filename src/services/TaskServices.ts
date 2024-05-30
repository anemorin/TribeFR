import { ApiConnection } from "./ApiConnection";

class TaskServices {
  static async CreateTask(name: string, content: string, tribeId: string, performerId: string) {
    const response = await ApiConnection.post('tasks/create', {
      name,
      content: {
        sections: [
          {
            label: 'Описание',
            input: {
              content: content,
            }
          }
        ]
      },
      tribeId,
      performerId
    });
    return response;
  }

  static async GetTasks(tribeId: string, userId: string) {
    const response = await ApiConnection.get(`tasks/get-all-taken-by-user/${tribeId}/${userId}`);
    return response;
  }
}

export { TaskServices };