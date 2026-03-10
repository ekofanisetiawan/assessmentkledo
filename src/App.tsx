import { useLoaderData, useSearchParams } from "react-router-dom"

type Province = { id: number; name: string }
type Regency = { id: number; name: string; province_id: number }
type District = { id: number; name: string; regency_id: number }

function App() {
  const { provinces, regencies, districts } = useLoaderData() as {
    provinces: Province[]
    regencies: Regency[]
    districts: District[]
  }

  const [searchParams, setSearchParams] = useSearchParams()

  const province = searchParams.get("province") || ""
  const regency = searchParams.get("regency") || ""
  const district = searchParams.get("district") || ""

  const regencyList = regencies.filter(
    (r) => r.province_id === Number(province)
  )

  const districtList = districts.filter(
    (d) => d.regency_id === Number(regency)
  )

  const provinceName =
    provinces.find((p) => p.id === Number(province))?.name || "-"

  const regencyName =
    regencies.find((r) => r.id === Number(regency))?.name || "-"

  const districtName =
    districts.find((d) => d.id === Number(district))?.name || "-"

  const setProvince = (value: string) => {
    setSearchParams({
      province: value,
      regency: "",
      district: "",
    })
  }

  const setRegency = (value: string) => {
    setSearchParams({
      province,
      regency: value,
      district: "",
    })
  }

  const setDistrict = (value: string) => {
    setSearchParams({
      province,
      regency,
      district: value,
    })
  }

  const resetFilter = () => {
    setSearchParams({})
  }

  return (
    <div className="flex min-h-screen bg-gray-100">


      <aside className="w-80 bg-white border-r p-8">

        <h2 className="text-lg font-semibold mb-8">
          Frontend Assessment
        </h2>

        <p className="text-xs text-gray-400 tracking-widest mb-4">
          FILTER WILAYAH
        </p>

        <div className="space-y-6">


          <div>
            <label className="text-xs text-gray-400 block mb-2">
              PROVINSI
            </label>

            <select
              name="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:outline-blue-400"
            >
              <option value="">Pilih Provinsi</option>

              {provinces.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="text-xs text-gray-400 block mb-2">
              KOTA / KABUPATEN
            </label>

            <select
              name="regency"
              value={regency}
              onChange={(e) => setRegency(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:outline-blue-400"
            >
              <option value="">Pilih Kota / Kabupaten</option>

              {regencyList.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="text-xs text-gray-400 block mb-2">
              KECAMATAN
            </label>

            <select
              name="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:outline-blue-400"
            >
              <option value="">Pilih Kecamatan</option>

              {districtList.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* RESET BUTTON */}

        <button
          onClick={resetFilter}
          className="mt-8 w-full border-2 border-blue-500 text-blue-500 rounded-xl py-3 hover:bg-blue-50 transition"
        >
          RESET
        </button>
      </aside>


      <main className="flex-1 p-16">


        <div className="breadcrumb text-sm text-gray-400 mb-12 tracking-wide">

          Indonesia /

          <span className="text-blue-400">
            {" "}{provinceName}
          </span>

          /

          <span className="text-blue-400">
            {" "}{regencyName}
          </span>

          /

          <span className="text-blue-500 font-semibold">
            {" "}{districtName}
          </span>

        </div>

        <div className="text-center">

          <p className="text-xs text-blue-400 tracking-widest mb-4">
            PROVINSI
          </p>

          <h1 className="text-6xl font-bold mb-16">
            {provinceName !== "-" ? provinceName : ""}
          </h1>

          <p className="text-xs text-blue-400 tracking-widest mb-4">
            KOTA / KABUPATEN
          </p>

          <h2 className="text-4xl font-semibold mb-16">
            {regencyName !== "-" ? regencyName : ""}
          </h2>

          <p className="text-xs text-blue-400 tracking-widest mb-4">
            KECAMATAN
          </p>

          <h3 className="text-2xl font-semibold">
            {districtName !== "-" ? districtName : ""}
          </h3>

        </div>
      </main>
    </div>
  )
}

export default App