import html2canvas from 'html2canvas';

export async function generateWeeklyWrapVideo(
  slideElements: HTMLElement[],
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d')!;

  const stream = canvas.captureStream(30); // 30 fps
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm;codecs=vp9',
    videoBitsPerSecond: 8000000
  });

  const chunks: Blob[] = [];

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      chunks.push(e.data);
    }
  };

  return new Promise((resolve, reject) => {
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      resolve(blob);
    };

    mediaRecorder.onerror = (e) => {
      reject(e);
    };

    mediaRecorder.start();

    // Render slides
    renderSlides(ctx, slideElements, onProgress).then(() => {
      mediaRecorder.stop();
    }).catch(reject);
  });
}

async function renderSlides(
  ctx: CanvasRenderingContext2D,
  slideElements: HTMLElement[],
  onProgress?: (progress: number) => void
) {
  const fps = 30;
  const slideDuration = 3; // seconds per slide

  // Only hide the slides container to prevent capture overlap
  // Keep the modal overlay and progress indicator visible
  const slidesContainer = slideElements[0]?.parentElement;
  const originalDisplay = slidesContainer?.style.display || '';
  if (slidesContainer) {
    slidesContainer.style.display = 'none';
  }

  // Create a container for full-screen rendering (positioned off-screen)
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '-10000px'; // Position way off-screen so user can't see it
  container.style.width = '1920px';
  container.style.height = '1080px';
  container.style.background = '#000000';
  document.body.appendChild(container);

  for (let slideIndex = 0; slideIndex < slideElements.length; slideIndex++) {
    const element = slideElements[slideIndex];

    // Clone and add to full-screen container
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = '1920px';
    clone.style.height = '1080px';
    clone.style.minHeight = '1080px';
    clone.style.margin = '0';
    clone.style.padding = '96px';
    clone.style.borderRadius = '0';
    clone.style.display = 'flex';
    clone.style.boxSizing = 'border-box';

    container.innerHTML = '';
    container.appendChild(clone);

    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 200));

    // Capture just the cloned slide
    const slideCanvas = await html2canvas(clone, {
      width: 1920,
      height: 1080,
      scale: 1,
      backgroundColor: '#000000',
      logging: false
    });

    const frames = slideDuration * fps;

    for (let frame = 0; frame < frames; frame++) {
      // Clear canvas
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Fade in/out animation
      const fadeInFrames = fps * 0.5; // 0.5 second fade in
      const fadeOutFrames = fps * 0.5; // 0.5 second fade out
      let opacity = 1;

      if (frame < fadeInFrames) {
        opacity = frame / fadeInFrames;
      } else if (frame > frames - fadeOutFrames) {
        opacity = (frames - frame) / fadeOutFrames;
      }

      ctx.globalAlpha = opacity;

      // Draw the captured slide
      ctx.drawImage(slideCanvas, 0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.globalAlpha = 1;

      // Update progress
      const totalFrames = slideElements.length * frames;
      const currentFrame = slideIndex * frames + frame;
      onProgress?.(currentFrame / totalFrames);

      // Wait for next frame
      await new Promise(resolve => setTimeout(resolve, 1000 / fps));
    }
  }

  // Cleanup - remove the container
  document.body.removeChild(container);

  // Restore the slides container
  if (slidesContainer) {
    slidesContainer.style.display = originalDisplay;
  }
}

export function downloadVideo(blob: Blob, filename: string = 'weekly-wrap.webm') {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
