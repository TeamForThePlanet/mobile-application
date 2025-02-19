import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const sendTestNotification = async () => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert([
        {
          message: 'Test notification - New post ready to share!',
          image_url: 'https://picsum.photos/200/300', // Random test image
          status: 'pending'
        }
      ])
      .select();

    if (error) throw error;
    console.log('Test notification sent successfully:', data);
  } catch (error) {
    console.error('Error sending test notification:', error);
  }
};

sendTestNotification();
