/* <wasyl-map> — interaktywna mapa obszaru wycieczek (Leaflet + OpenStreetMap) */
(function () {
  const AREA = [
    [49.30, 20.92], [49.62, 20.98], [49.78, 21.32], [49.82, 21.92],
    [49.62, 22.34], [49.38, 22.18], [49.24, 21.66], [49.22, 21.20]
  ];
  const PLACES = [
    { n: 'Gorlice', c: [49.655, 21.160] },
    { n: 'Jasło', c: [49.745, 21.472] },
    { n: 'Krosno', c: [49.688, 21.770] },
    { n: 'Dukla', c: [49.556, 21.683] },
    { n: 'Sanok', c: [49.556, 22.206] },
    { n: 'Zyndranowa', c: [49.440, 21.652] },
    { n: 'Magura Wątkowska', c: [49.545, 21.372], dir: 'left' }
  ];

  class WasylMap extends HTMLElement {
    connectedCallback() {
      if (this._done) return;
      this._done = true;
      this.style.display = 'block';
      this.style.width = '100%';
      this.style.height = this.getAttribute('height') || '100%';
      const accent = this.getAttribute('accent') || '#0E5236';
      const wait = () => {
        if (!window.L) return setTimeout(wait, 60);
        this.init(accent);
      };
      wait();
    }
    init(accent) {
      const map = L.map(this, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors', maxZoom: 17
      }).addTo(map);
      const area = L.polygon(AREA, {
        color: accent, weight: 1.5, opacity: 0.9, fillColor: accent, fillOpacity: 0.10
      }).addTo(map);
      map.fitBounds(area.getBounds(), { padding: [24, 24] });
      PLACES.forEach(function (p) {
        L.circleMarker(p.c, {
          radius: 4, color: accent, weight: 2, fillColor: '#fff', fillOpacity: 1
        }).addTo(map).bindTooltip(p.n, {
          permanent: true,
          direction: p.dir || 'right',
          className: 'wasyl-tip',
          offset: p.dir === 'left' ? [-6, 0] : [6, 0]
        });
      });
      const style = document.createElement('style');
      style.textContent = '.wasyl-tip{background:transparent;border:0;box-shadow:none;color:#1b211d;font:500 12px/1.2 Barlow,system-ui,sans-serif;letter-spacing:.04em;text-transform:uppercase}.wasyl-tip::before{display:none}';
      document.head.appendChild(style);
      setTimeout(function () { map.invalidateSize(); }, 200);
    }
  }
  if (!customElements.get('wasyl-map')) customElements.define('wasyl-map', WasylMap);
})();
