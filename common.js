document.addEventListener('DOMContentLoaded', () => {
    const heroImg = document.querySelector('.heroimg');
    const overlay = document.querySelector('.overlay'); // 黑色遮罩层
    const buttons = document.querySelectorAll('.btn-mary'); // 选择所有按钮

    // 创建光照效果的元素
    const light = document.createElement('div');
    light.classList.add('light'); // 添加光照效果的类名

    // 将光照效果元素添加到 heroImg 中
    heroImg.appendChild(light);

    let animationFrameId = null;

    function handleMouseMove(e) {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
            const rect = heroImg.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // 判断鼠标是否在按钮区域内
            const isOverButton = Array.from(buttons).some(btn => {
                const btnRect = btn.getBoundingClientRect();
                return x >= btnRect.left && x <= btnRect.right &&
                       y >= btnRect.top && y <= btnRect.bottom;
            });

            if (!isOverButton) {
                light.style.left = `${x}px`;
                light.style.top = `${y}px`;
                light.style.opacity = '1';
                light.style.transform = `translate(-50%, -50%) scale(1.2)`;

                heroImg.classList.add('saturate-effect');
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            } else {
                // 如果在按钮上，则隐藏光照效果和飽和度提高效果
                light.style.opacity = '0';
                light.style.transform = 'translate(-50%, -50%) scale(1)';
                heroImg.classList.remove('saturate-effect');
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // 黑色遮罩层出现
            }
        });
    }

    function handleMouseLeave() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
            light.style.opacity = '0';
            light.style.transform = 'translate(-50%, -50%) scale(1)';
            heroImg.classList.remove('saturate-effect');
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // 黑色遮罩层出现
        });
    }

    // 为 heroImg 添加事件监听器
    heroImg.addEventListener('mousemove', handleMouseMove);
    heroImg.addEventListener('mouseleave', handleMouseLeave);

    // 为每个按钮添加事件监听器
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // 更新按钮的 CSS 变量
            btn.style.setProperty('--x', `${x}px`);
            btn.style.setProperty('--y', `${y}px`);

            // 如果需要，添加光晕效果
            light.style.opacity = '0'; // 确保当鼠标在按钮上时光晕效果不会显示
        });

        btn.addEventListener('mouseleave', handleMouseLeave);
    });
});
