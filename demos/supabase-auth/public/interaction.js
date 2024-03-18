const supabaseUrl = 'https://wuhacmbmdguonuqeycgv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1aGFjbWJtZGd1b251cWV5Y2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyMTAwNzksImV4cCI6MjAyNTc4NjA3OX0.z6iQWWpNnjlwhfByg7Xckrem1wii4wqi-Ish3E4PzHY';

const _supabaseAnon = supabase.createClient(supabaseUrl, supabaseAnonKey);



document.addEventListener('DOMContentLoaded', async () => {

  
    let globalEthereumAddress = null;
  
    async function authenticateViaMetamask() {
      if (!window.ethereum) {
        alert('Please install MetaMask to use this feature!');
        return;
      }
  
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        globalEthereumAddress = accounts[0];
        console.log('Authenticated with address:', globalEthereumAddress);
        // You may want to do more here, like fetching user-related data
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    }
  
    async function fetchPublications() {
      const { data, error } = await _supabaseAnon
        .from('publicationsExample')
        .select('*')
        .order('created_at', { ascending: false });
  
      if (error) {
        console.error('Error fetching publications:', error);
        return;
      }
  
      const publicationsContainer = document.getElementById('publications');
      publicationsContainer.innerHTML = data.map(pub => `
        <div class="publication">
          <p>${pub.content}</p>
          <button onclick="likePublication('${pub.publication_id}')">Like</button>
        </div>
      `).join('');
    }
  
    async function createPublication() {
      const content = prompt('Enter publication content:');
      if (!content) return;
  
      const { error } = await _supabaseAnon
        .from('publicationsExample')
        .insert([{ user_address: globalEthereumAddress, content }]);
  
      if (error) {
        console.error('Error creating publication:', error);
      } else {
        console.log('Publication created successfully');
        fetchPublications(); // Refresh the publications list
      }
    }
  
    window.likePublication = async (publicationId) => {
      // This example assumes liking a publication doesn't require a specific table.
      // Implement liking functionality based on your application logic.
      console.log('Liking publication ID:', publicationId);
      // Here you would typically insert a like into the `likesExample` table.
    };
  
    document.getElementById('auth-metamask').addEventListener('click', authenticateViaMetamask);
    document.getElementById('fetch-publications').addEventListener('click', fetchPublications);
    document.getElementById('create-publication').addEventListener('click', createPublication);
  
    // Initial fetch of publications
    await fetchPublications();
  });
  