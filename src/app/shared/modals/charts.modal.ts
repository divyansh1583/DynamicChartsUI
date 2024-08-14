export interface AudienceMetricsDTO {
    avg_Session: number;
    conversion_Rate: number;
    avg_Session_Duration_Seconds: number;
    avg_Session_Increase_Percentage: number;
    conversion_Rate_Increase_Percentage: number;
    avg_Session_Duration_Increase_Percentage: number;
    monthlyData: MonthlyData[];
  }
  
  interface MonthlyData {
    month: number;
    sessions: number;
    year: number;
  }