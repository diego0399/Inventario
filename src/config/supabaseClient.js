import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = 'https://prewulgjtqxuheuzonhx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByZXd1bGdqdHF4dWhldXpvbmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxNTQ5NTMsImV4cCI6MjA2OTczMDk1M30.MGX6ZB8E9I-uKv-h6PvNgV-X3DsMjEpUy2RmESsxsHA';
export const supabase = createClient(supabaseUrl, supabaseKey);
