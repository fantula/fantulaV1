const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = createClient(process.env.NUXT_PUBLIC_SUPABASE_URL, process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY)

async function test() {
  const { data, error } = await supabase
    .from('products')
    .select('id, product_name, spec_definition')
    .order('updated_at', { ascending: false })
    .limit(3)
  
  if (error) console.error(error)
  else console.log(JSON.stringify(data, null, 2))
}
test()
