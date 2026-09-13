// DesignLab public configuration.
// Supabase publishable keys are intended for browser use and are protected by RLS.

const SUPABASE_URL = "https://fyhxipoayyhlrablgvll.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_62LdQNox7y8HFWzO9tPS0Q_1nQ8qV9g";

// Legacy Apps Script remains active for inquiries, visitor analytics,
// and the private dashboard until those systems are migrated separately.
const API_URL = "https://script.google.com/macros/s/AKfycbzu5Beh0F65rsUkUFJf2GdfwTOK0g-GEamgzsTtpH2T1uIrj76AvJvkgITCVLrd268X/exec";

// Daily Task Tracker Apps Script used by the private admin dashboard.
const TASK_API_URL = "https://script.google.com/macros/s/AKfycbxlo1kTf-oLJZw4K2K6id5zneynwjln66f98n6EETF2kySwpta3a45zYT_2K_FJNNXN/exec";

window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_PUBLISHABLE_KEY = SUPABASE_PUBLISHABLE_KEY;
