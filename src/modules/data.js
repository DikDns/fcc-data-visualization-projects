import { getFetch } from "./fetch.js";
import { round } from "./utils.js";

const SEKOLAH =
  "https://raw.githubusercontent.com/DikDns/personal-project-data/main/fcc-choropleth-map/sekolah.json";
const PROVINSI =
  "https://raw.githubusercontent.com/DikDns/personal-project-data/main/fcc-choropleth-map/provinces-simplified-topo.json";

export async function getSekolah() {
  const data = await getFetch(SEKOLAH);
  return data.map((d) => ({
    ...d,
    persentaseKesenjangan: {
      SMANegeri: round(d.jumlahMuridSMANegeri / d.jumlahGuruSMANegeri - 1, 100),
      SMASwasta: round(d.jumlahMuridSMASwasta / d.jumlahGuruSMASwasta - 1, 100),
    },
  }));
}

export async function getProvinsi() {
  const data = await getFetch(PROVINSI);
  return data;
}
