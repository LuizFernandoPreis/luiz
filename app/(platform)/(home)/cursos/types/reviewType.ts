export type Review = {
    _class: string;
    id: number;
    content: string;
    rating: number;
    created: string;
    modified: string;
    user_modified: string;
    user: {
      _class: string;
      title: string;
      name: string;
      display_name: string;
    };
};