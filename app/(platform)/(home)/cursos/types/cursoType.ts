type Instructor = {
    _class: string;
    title: string;
    name: string;
    display_name: string;
    job_title: string;
    image_50x50: string;
    image_100x100: string;
    initials: string;
    url: string;
  };
  
  type Locale = {
    _class: string;
    locale: string;
    title: string;
    english_title: string;
    simple_english_title: string;
  };

  type price = {
    price_string: string
  }
  
  type Curso = {
    _class: string;
    id: number;
    title: string;
    url: string;
    is_paid: boolean;
    price: string;
    price_detail: price;
    price_serve_tracking_id: string;
    visible_instructors: Instructor[];
    image_125_H: string;
    image_240x135: string;
    is_practice_test_course: boolean;
    image_480x270: string;
    published_title: string;
    tracking_id: string;
    locale: Locale;
    predictive_score: number | null;
    relevancy_score: number | null;
    input_features: any | null;
    lecture_search_result: any | null;
    curriculum_lectures: any[];
    order_in_results: number | null;
    curriculum_items: any[];
    headline: string;
    instructor_name: string | null;
  };
  
  export default Curso;