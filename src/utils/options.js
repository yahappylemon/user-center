// customer組件
export const tableHead = [
  "Edit/Delete",
  "Name",
  "Gender",
  "Main Exercise",
  "Main approach",
  "First Lesson",
];

// NewCustomer組件
export const initialState = {
  customerName: "",
  birthYear: null,
  gender: "",
  phoneNumber: "",
  email: "",
  frequency: "",
  regularExercises: [],
  otherExercises: "",
  approaches: [],
  otherApproaches: "",
  firstLesson: null,
  lastLesson: null,
  totalLessons: "",
  remainingLessons: "",
  medicalHistoryCategory: [],
  medicalHistoryOther: "",
  medicalHistoryBroken: "",
  medicalHistorySurgery: "",
  medication: "",
  symptoms: "",
  symptomCauses: "",
  transportationCategory: [],
};

export const exercisesOptions = [
  "Yoga",
  "Jogging",
  "Swimming",
  "Biking",
  "Golfing",
  "Dancing",
  "Workout",
  "Basketball",
  "Volleyball",
  "Soccer",
  "Other",
];

export const approachesOptions = [
  "Social media",
  "Referral by friend/family",
  "Other",
];

export const medicalHistoryOptions = [
  "Anxiety",
  "Back Injury",
  "Cancer",
  "Diabetes",
  "Eating Disorder",
  "Heart Disease",
  "High Blood Pressure",
  "High Cholesterol",
  "Other",
];
