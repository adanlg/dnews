/* global document, window, axios, supabase, ethers */
const AUTH_API_URL = 'http://localhost:3000/api/auth';
const SUPABASE_URL = 'https://wuhacmbmdguonuqeycgv.supabase.co';
const SUPABASE_PUBLIC_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1aGFjbWJtZGd1b251cWV5Y2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyMTAwNzksImV4cCI6MjAyNTc4NjA3OX0.z6iQWWpNnjlwhfByg7Xckrem1wii4wqi-Ish3E4PzHY';

const elError = document.getElementById('error');
const elUser = document.getElementById('user');
const elBtnMetamask = document.getElementById('auth-metamask');
const elBtnGetUser = document.getElementById('getUser');
const elBtnGetUserAnon = document.getElementById('getUserAnon');
const elBtnLike = document.getElementById('like');

const _supabaseAnon = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY);
let _supabaseAuthenticated;
let globalEthereumAddress = null;

const handleApiPost = async (endpoint, params) => {
  const result = await axios.post(`${AUTH_API_URL}/${endpoint}`, params, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result.data;
};

const requestMessage = (account, chain) =>
  handleApiPost('request-message', {
    address: account,
    chain,
    networkType: 'evm',
  });

const verifyMessage = (message, signature) =>
  handleApiPost('sign-message', {
    message,
    signature,
    networkType: 'evm',
  });

const getUser = async () => {
  if (!_supabaseAuthenticated) {
    window.alert('You need to authenticate with Metamask first.');
    return;
  }
  const { data } = await _supabaseAuthenticated.from('users').select('*');
  renderUser(data);
  renderError();
};

const getUserAnon = async () => {
  const { data } = await _supabaseAnon.from('users').select('*');
  renderUser(data);
  renderError();
};

const postLike = async (ethereumAddress) => {
  if (!_supabaseAuthenticated || !ethereumAddress) {
    console.log('User needs to authenticate first.');
    window.alert('You need to authenticate first.');
    return;
  }

  console.log('Fetching like record for address:', ethereumAddress);

  let { data: likesData, error: likesError } = await _supabaseAuthenticated
    .from('likes')
    .select('*')
    .eq('user_address', ethereumAddress)
    .maybeSingle();

  if (likesError) {
    console.error('Error fetching likes:', likesError);
    return;
  }

  if (likesData) {
    console.log('Like record exists, updating like count...');
    const { error: updateError } = await _supabaseAuthenticated
      .from('likes')
      .update({ like_count: likesData.like_count + 1 })
      .match({ user_address: ethereumAddress });

    if (updateError) {
      console.error('Error updating like count:', updateError);
    } else {
      console.log('Like count successfully updated.');
    }
  } else {
    console.log('No like record found, creating new like record...');
    const { error: insertError } = await _supabaseAuthenticated
      .from('likes')
      .insert([{ user_address: ethereumAddress, like_count: 1 }]);

    if (insertError) {
      console.error('Error creating like record:', insertError);
    } else {
      console.log('New like record successfully created.');
    }
  }
};

const connectToMetamask = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  const [accounts, chainId] = await Promise.all([
    provider.send('eth_requestAccounts', []),
    provider.send('eth_chainId', []),
  ]);
  const signer = provider.getSigner();
  return { signer, chain: chainId, account: accounts[0] };
};

const handleAuth = async () => {
  const { signer, chain, account } = await connectToMetamask();
  if (!account) {
    throw new Error('No account found');
  }
  if (!chain) {
    throw new Error('No chain found');
  }

  globalEthereumAddress = account;
  const { message } = await requestMessage(account, chain);
  const signature = await signer.signMessage(message);
  const { user } = await verifyMessage(message, signature);

  _supabaseAuthenticated = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY, {
    global: {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    },
  });

  renderUser(user);
  renderError();
  document.getElementById('post-section').style.display = 'block'; 
};

const renderUser = (user) => {
  elUser.innerHTML = user ? JSON.stringify(user, null, 2) : '';
};

const renderError = (error) => {
  elError.innerHTML = error ? JSON.stringify(error.message, null, 2) : '';
};

async function submitPost() {
  if (!_supabaseAuthenticated) {
    window.alert('You need to authenticate first.');
    return;
  }

  const postText = document.getElementById('post-text').value;
  const postImageFile = document.getElementById('post-image').files[0];

  try {
    // Upload the image and get the URL
    const imageUrl = await uploadImageToStorage(postImageFile);

    // Prepare the JSON content for the 'post_content' column
    const postContent = JSON.stringify({ text: postText, imageUrl: imageUrl });

    // Insert post into Supabase
    const { data: postData, error: postError } = await _supabaseAuthenticated
      .from('publications')
      .insert([{
        address: globalEthereumAddress, // The user's address
        image: imageUrl,                 // URL of the uploaded image
        num_likes: 0,                    // Initial number of likes
        time: new Date().toISOString(),  // Current timestamp
        post_num: Date.now(),            // Use the timestamp as a post number (you might want a different logic for production)
        post_content: postContent        // The JSON content
      }]);

    if (postError) throw postError;

    window.alert('Post created successfully!');
    document.getElementById('post-text').value = '';
    document.getElementById('post-image').value = '';
  } catch (error) {
    console.error('Error creating post:', error);
    window.alert('Failed to create post.');
  }
}


// Placeholder function for image upload - replace this with your actual image upload logic
// This function uploads an image to Supabase Storage and returns the public URL.
async function uploadImageToStorage(imageFile) {
  // Replace 'public' with your Supabase Storage Bucket name if it's different.
  const bucketName = 'publications-images';

  // Generate a unique file name - this example uses the current timestamp.
  // You should use a more robust method in production.
  const fileName = `${Date.now()}-${imageFile.name}`;

  // Upload the image file to Supabase Storage
  const { data, error } = await _supabaseAuthenticated.storage
    .from(bucketName)
    .upload(fileName, imageFile);

  // Throw an error if the upload failed
  if (error) {
    throw error;
  }

  // Once the upload is successful, create a public URL for the file
  const fileUrl = `${SUPABASE_URL.replace('.co', '.in')}/storage/v1/object/public/${bucketName}/${fileName}`;

  // Return the public URL of the uploaded image
  return fileUrl;
}

// Add event listener for the submit post button
document.getElementById('submit-post').addEventListener('click', submitPost);


function init() {
  elBtnMetamask.addEventListener('click', async () => {
    handleAuth().catch((error) => renderError(error));
  });
  elBtnGetUser.addEventListener('click', async () => {
    getUser().catch((error) => renderError(error));
  });
  elBtnGetUserAnon.addEventListener('click', async () => {
    getUserAnon().catch((error) => renderError(error));
  });
  elBtnLike.addEventListener('click', async () => {
    if (!globalEthereumAddress) {
      console.error('No Ethereum address found. User must authenticate first.');
      return;
    }
    postLike(globalEthereumAddress).catch((error) => renderError(error));
  });
}

window.addEventListener('load', init);
