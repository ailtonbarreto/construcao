window.addEventListener('DOMContentLoaded', () => {

    const btn_login = document.getElementById("btn_login");

    btn_login.addEventListener("click", async () => {
        const usuario = document.getElementById("user").value;
        const senha = document.getElementById("password").value;
        const msg = document.getElementById('msg');
        const spinner = document.getElementById("loading");

        // spinner.style.display = "flex";


        try {
            const response = await fetch("https://barretoapps.com.br/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, senha, conta: "none", currency:'none'})
            });

            if (!response.ok) {

                const errorData = await response.json();
                msg.innerHTML = errorData.detail
                return;
            }

            const data = await response.json();

            // spinner.style.display = "none";
            

            sessionStorage.setItem("id_user", data.id_user);
            sessionStorage.setItem("count_type", data.conta);
            sessionStorage.setItem("logon", 1);
            sessionStorage.setItem("user", usuario);
            sessionStorage.setItem("currency",data.currency);
            window.location.href = "dash.html";

        } catch (error) {
            console.error("Erro no login:", error);
            alert("Erro na conexão com o servidor.");
        }
    });

});