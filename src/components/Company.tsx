export type CompanyType = {
  id?: number;
  name?: string;
  legal_name?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  gstn?: string;
  phone_no?: string;
  email?: string;
  website?: string;
  bank_name?: string;
  account_no?: string;
  ifsc_code?: string;
  upi_id?: string;
  owner_email?: string;
};

export type CompanyUsersType = {
  id?: number;
  company_id?: number;
  company_name?: string;
  user_email?: string;
};
