import { ApiConnection } from "./ApiConnection";

class TaskServices {
  static async CreateTask(name: string, content: string, tribeId: string, performerId: string) {
    const response = await ApiConnection.post('tasks/create', {
      name,
      content: {
        sections: [
          {
            content: content,
          }
        ]
      },
      tribeId,
      performerId
    });
    return response;
  }
}

export { TaskServices };