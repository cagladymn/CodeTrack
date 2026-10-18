
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const [ogrenmeKonulari, setOgrenmeKonulari] = useState(() => {
  const kayitliKonular = localStorage.getItem('ogrenmeKonulari')

  return kayitliKonular ? JSON.parse(kayitliKonular) : []
})
  const [yeniKonu, setYeniKonu] = useState('')
useEffect(() => {
  localStorage.setItem(
    'ogrenmeKonulari',
    JSON.stringify(ogrenmeKonulari),
  )
}, [ogrenmeKonulari])

  function konuEkle(event) {
    event.preventDefault()

    if (!yeniKonu.trim()) return

    setOgrenmeKonulari([
      ...ogrenmeKonulari,
      {
        id: Date.now(),
        title: yeniKonu.trim(),
        category: 'Genel',
        status: 'Başlanmadı',
      },
    ])

    setYeniKonu('')
  }

  function konuSil(id) {
    setOgrenmeKonulari(
      ogrenmeKonulari.filter((konu) => konu.id !== id),
    )
  }

  function konuGuncelle(id) {
    setOgrenmeKonulari(
      ogrenmeKonulari.map((konu) =>
        konu.id === id
          ? {
              ...konu,
              status:
                konu.status === 'Başlanmadı'
                  ? 'Devam Ediyor'
                  : konu.status === 'Devam Ediyor'
                    ? 'Tamamlandı'
                    : 'Başlanmadı',
            }
          : konu,
      ),
    )
  }

  const tamamlananKonuSayisi = ogrenmeKonulari.filter(
    (konu) => konu.status === 'Tamamlandı',
  ).length

  const devamEdenKonuSayisi = ogrenmeKonulari.filter(
    (konu) => konu.status === 'Devam Ediyor',
  ).length
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h3 className="brand">
          Code<span>Track</span>
        </h3>

        <p className="sidebar-label">ÇALIŞMA ALANI</p>

        <div className="nav-item active">▦ &nbsp; Genel Bakış</div>
        <div className="nav-item">⌘ &nbsp; Öğrenme Konuları</div>
        <div className="nav-item">✎ &nbsp; Notlarım</div>
        <div className="nav-item">◇ &nbsp; Projelerim</div>

        <div className="sidebar-bottom">
          Öğrenme yolculuğun, düzenli bir şekilde.
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">YAZILIM GELİŞTİRME ALANIN</p>
            <h2>Öğrenme Paneli</h2>
          </div>

          <div className="profile-badge">CT</div>
        </header>

        <section className="welcome-section">
          <div>
            <p className="eyebrow">İLERLEMEYE DEVAM ET</p>
            <h1>Geleceğini adım adım oluştur.</h1>
            <p className="muted">
              Öğrendiklerini takip et, ilerlemeni kutla.
            </p>
          </div>

          <div className="welcome-icon">⌘</div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <p>Toplam Konu</p>
            <h2>{ogrenmeKonulari.length}</h2>
            <span>Öğrenme planındaki konular</span>
          </div>

          <div className="stat-card">
            <p>Tamamlanan</p>
            <h2>{tamamlananKonuSayisi}</h2>
            <span>Başarıyla tamamlanan konular</span>
          </div>

          <div className="stat-card">
            <p>Devam Eden</p>
            <h2>{devamEdenKonuSayisi}</h2>
            <span>Üzerinde çalıştığın konular</span>
          </div>
        </section>

        <section className="topics-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ÖĞRENME PLANIN</p>
              <h3>Öğrenme Konuları</h3>
            </div>

            <span className="topic-count">
              {ogrenmeKonulari.length} konu
            </span>
          </div>

          <form className="add-topic-form" onSubmit={konuEkle}>
            <input
              className="form-control"
              value={yeniKonu}
              onChange={(event) => setYeniKonu(event.target.value)}
              placeholder="Örn. Python, JavaScript dizileri..."
              aria-label="Yeni konu adı"
            />

            <button className="btn btn-primary" type="submit">
              + Konu Ekle
            </button>
          </form>

          <div className="topic-list">
            {ogrenmeKonulari.length === 0 ? (
              <div className="empty-state">
                <h4>Henüz konu eklemedin.</h4>
                <p>
                  Öğrenmek istediğin ilk konuyu ekleyerek başla!
                </p>
              </div>
            ) : (
              ogrenmeKonulari.map((konu) => (
                <div className="topic-row" key={konu.id}>
                  <div className="topic-symbol">&lt;/&gt;</div>

                  <div className="topic-info">
                    <strong>{konu.title}</strong>
                    <span>{konu.category}</span>
                  </div>

                  <button
                    className={`status-button ${
                         konu.status === 'Başlanmadı'
                           ? 'not-started'
                           : konu.status === 'Devam Ediyor'
                              ? 'in-progress'
                              : 'completed'
                      }`}

                    onClick={() => konuGuncelle(konu.id)}
                    type="button"
                    title="Durumu değiştirmek için tıkla"
                  >
                    {konu.status}
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => konuSil(konu.id)}
                    type="button"
                    aria-label={`${konu.title} konusunu sil`}
                    title="Konuyu sil"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          <p className="helper-text">
              İpucu: Öğrenme sürecini değiştirmek için butona tıkla.
          </p>
        </section>

        <footer>
          Merak etmeye ve üretmeye devam et. ✦
        </footer>
      </main>
    </div>
  )
}

export default App
