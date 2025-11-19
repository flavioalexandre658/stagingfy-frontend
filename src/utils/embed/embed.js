(function () {
    const BASE = "https://chatagentes.com";
    const CONTAINER_ID = "chatagentes-container";

    // Guarda o estado inicial
    const stub = window.chatagentes;
    const queue = stub.q || [];

    // Função principal que despacha comandos
    function handleCommand(cmd, opts = {}) {
        switch (cmd) {
            case "open":
                openChat(opts);
                break;
            case "close":
                closeChat();
                break;
            default:
                console.warn("chatagentes: comando desconhecido:", cmd);
        }
    }

    // Abre o chat: cria <div> + <iframe>
    function openChat({ slug, url, width = "350px", height = "500px" } = {}) {
        if (!slug) {
            console.error("chatagentes: é preciso passar { uuid: '...' }");
            return;
        }
        if (document.getElementById(CONTAINER_ID)) return;

        const container = document.createElement("div");
        container.id = CONTAINER_ID;
        Object.assign(container.style, {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width,
            height,
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            background: "#fff",
            zIndex: 9999,
        });

        const iframe = document.createElement("iframe");
        iframe.src = url || `${BASE}/chat/${slug}`;
        Object.assign(iframe.style, {
            width: "100%",
            height: "100%",
            border: "0",
        });

        container.appendChild(iframe);
        document.body.appendChild(container);
    }

    // Fecha o chat: remove o <div>
    function closeChat() {
        const c = document.getElementById(CONTAINER_ID);
        if (c) c.remove();
    }

    // 1) Processa qualquer chamada que já esteja na fila
    queue.forEach(args => handleCommand(args[0], args[1]));

    // 2) Substitui o stub por uma função direta
    window.chatagentes = (cmd, opts) => handleCommand(cmd, opts);

    // 3) Sinaliza que o embed foi inicializado
    window.chatagentes.getState = "initialized";

    // 4) Expõe métodos auxiliares
    window.chatagentes.open = openChat;
    window.chatagentes.close = closeChat;
})();
