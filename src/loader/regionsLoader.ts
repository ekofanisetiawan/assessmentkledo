export async function regionsLoader() {
  const res = await fetch("/data/indonesia_regions.json")
  const data = await res.json()

  return {
    provinces: data.provinces,
    regencies: data.regencies,
    districts: data.districts
  }
}