const wallpaperGrid = document.getElementById('wallpaperGrid');
const wallpaperForm = document.getElementById('wallpaperForm');
const wallpaperStatus = document.getElementById('wallpaperStatus');

function setWallpaperStatus(message, isError = false) {
    wallpaperStatus.innerText = message || '';
    wallpaperStatus.classList.toggle('error', isError);
}

function wallpaperCard(background) {
    const card = document.createElement('article');
    card.className = 'wallpaperCard';

    const image = document.createElement('img');
    image.src = background.thumbnailUrl;
    image.alt = background.name;
    image.loading = 'lazy';

    const name = document.createElement('h3');
    name.innerText = background.name;

    const meta = document.createElement('p');
    meta.innerText = background.resolution;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const open = document.createElement('a');
    open.href = background.imageUrl;
    open.target = '_blank';
    open.innerHTML = '<i class="icmn-image2"></i> Open';

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.innerHTML = '<i class="icmn-bin"></i> Delete';
    remove.addEventListener('click', () => deleteWallpaper(background.uuid));

    actions.append(open, remove);
    card.append(image, name, meta, actions);
    return card;
}

async function loadWallpapers() {
    setWallpaperStatus('Loading wallpapers...');
    wallpaperGrid.innerHTML = '';

    try {
        const response = await fetch('/api/backgrounds');
        const payload = await response.json();

        if (!response.ok || payload.code !== 0) {
            throw new Error(payload.message || 'Unable to load wallpapers.');
        }

        if (payload.backgrounds.length === 0) {
            setWallpaperStatus('No wallpapers uploaded yet.');
            return;
        }

        setWallpaperStatus('');
        payload.backgrounds.forEach((background) => {
            wallpaperGrid.appendChild(wallpaperCard(background));
        });
    } catch (error) {
        setWallpaperStatus(error.message, true);
    }
}

async function deleteWallpaper(uuid) {
    if (!confirm('Delete this wallpaper?')) return;

    try {
        const response = await fetch(`/api/backgrounds/${uuid}`, { method: 'DELETE' });
        const payload = await response.json();

        if (!response.ok || payload.code !== 0) {
            throw new Error(payload.message || 'Unable to delete wallpaper.');
        }

        await loadWallpapers();
    } catch (error) {
        setWallpaperStatus(error.message, true);
    }
}

wallpaperForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    setWallpaperStatus('Uploading wallpaper...');

    try {
        const formData = new FormData(wallpaperForm);
        const response = await fetch('/api/backgrounds', {
            method: 'POST',
            body: formData,
        });
        const payload = await response.json();

        if (!response.ok || payload.code !== 0) {
            throw new Error(payload.message || 'Unable to upload wallpaper.');
        }

        wallpaperForm.reset();
        await loadWallpapers();
    } catch (error) {
        setWallpaperStatus(error.message, true);
    }
});

loadWallpapers();
