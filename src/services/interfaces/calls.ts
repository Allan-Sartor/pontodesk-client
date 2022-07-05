export interface CallsContextProps {
  
}

export interface CallsProps {
  calls: Call[];
}

export interface Call {
  id: number;
  title: string;
  priority_level: string;
  anydesk_number: number;
  description: string;
  call_status: boolean;
  created_at: Date;
  image_url: string;
}