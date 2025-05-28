async function searchData() {
    const input = document.getElementById('searchInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p class="loading">Loading...</p>';

    // Blockchain.com کی مفت API (Bitcoin Mainnet)
    const API_URL = https://blockchain.info/rawaddr/${input}?limit=5;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // ڈیٹا کو صاف طریقے سے دکھائیں
        let html = `
            <h2>Address: ${data.address}</h2>
            <p>Total Received: ${data.total_received / 100000000} BTC</p>
            <p>Total Sent: ${data.total_sent / 100000000} BTC</p>
            <h3>Latest Transactions:</h3>
        `;

        data.txs.forEach(tx => {
            html += `
                <div class="tx">
                    <p>Hash: <a href="https://blockchain.info/tx/${tx.hash}" target="_blank">${tx.hash}</a></p>
                    <p>Amount: ${tx.result / 100000000} BTC</p>
                </div>
            `;
        });

        resultDiv.innerHTML = html;
    } catch (error) {
        resultDiv.innerHTML = '<p class="error">Error: Invalid Bitcoin Address, TX Hash, or Block Height.</p>';
    }
}
