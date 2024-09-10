// Postları API'den çekip tabloya ekleme işlemine başlıyoruz
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        if (!response.ok) {
            throw new Error("Postları çekerken bir hata oluştu: " + response.status);
        }
        return response.json();
    })
    .then(posts => {
        const tableBody = document.getElementById('postsTable').getElementsByTagName('tbody')[0];

        posts.forEach(post => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = post.id;
            row.insertCell().textContent = post.title;

            const actionCell = row.insertCell();
            const button = document.createElement('button');
            button.textContent = 'Detayları Gör';
            button.onclick = () => showPostDetails(post.id);
            actionCell.appendChild(button);
        });
    })
    .catch(error => {
        console.error('Postları çekerken hata:', error);
        alert('Postları çekerken hata oluştu.');
    });

// Tek post detaylarını gösterme
function showPostDetails(postId) {
    console.log(`Post ID ${postId} için detaylar yükleniyor...`);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Postu çekerken bir hata oluştu: " + response.status);
            }
            return response.json();
        })
        .then(post => {
            console.log('Post Detayları:', post); // Veri kontrolü
            const postDetailsDiv = document.getElementById('postDetails');
            postDetailsDiv.innerHTML = `
                <h3>Başlık: ${post.title}</h3>
                <p><strong>ID:</strong> ${post.id}</p>
                <p><strong>İçerik:</strong> ${post.body}</p>
            `;
        })
        .catch(error => {
            console.error('Post detaylarını çekerken hata:', error);
            alert('Post detaylarını çekerken hata oluştu.');
        });
}
