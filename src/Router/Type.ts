export namespace Parameter {
  export type ID = {
    id: string;
  };
}

export namespace Response {
  export type Empty = null;
}

export namespace Body {
  export type Status = {
    status: string;
  }

  export type Message = {
    message: string;
  }

  export type Progress = {
    completed: number;
    pending: number;
  }

  export type Lifetime = {
    start: Date;
    end: Date;
  }

  export type Job = {
    id: string;
    status: string;
  }

  export type Empty = {

  }
}
