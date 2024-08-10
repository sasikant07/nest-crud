const mode = "dev";

let base_url = "";

if (mode === "dev") {
  base_url = "http://localhost:8080";
} else {
  base_url = "";
}

export { base_url };
