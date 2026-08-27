# Assets Required

## Images

### Required:
- `images/logo.webp` - Al Circo Ristorante Pizzeria logo (from existing site)
- `images/hero-circus.jpg` - Circus performance / tent photo
- `images/about-heritage.jpg` - Interior with circus photos on walls
- `images/award-excellence.png` - Certificato di Eccellenza TripAdvisor 2025 badge
- `images/award-travellers-choice.png` - Travellers' Choice Award 2025 badge

### Optional:
- Additional menu placeholder images

### Menu dish images (`images/menu/`)

- `images/menu/*.jpg|png` — Real dish photos downloaded from the restaurant's
  online menu (`alcircoristoranteitaliano.menu.is.it/images_catalogo_chack/`).
- `images/menu/placeholder.png` — 1x1 cream pixel used for menu items that have
  no source photo (Menu Bambini, Calzoni, Ingredienti Extra, several vegan items).
- Referenced by the `image` field in `data/menu.json` as `images/menu/<filename>`.

## Notes

1. All images should be in WebP format for optimal performance
2. Hero and about images should have `srcset` attribute with 1x and 2x versions
3. Award badges should be downloaded from TripAdvisor press kit for official 2025 awards
4. Images should be optimized for web (compress, reasonable file sizes)
