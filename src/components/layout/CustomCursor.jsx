import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
      }
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
      }
      animId = requestAnimationFrame(animateFollower);
    };

    const onMouseOver = (e) => {
      const el = e.target;
      if (el.matches('a, button, [data-cursor="pointer"], input, textarea')) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e) => {
      const el = e.target;
      if (el.matches('a, button, [data-cursor="pointer"], input, textarea')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    animId = requestAnimationFrame(animateFollower);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Only show on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor hidden md:block"
        style={{
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          opacity: 0.8,
        }}
      />
      <div
        ref={followerRef}
        className="custom-cursor-follower hidden md:block"
        style={{
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          opacity: isHovering ? 0.6 : 0.3,
        }}
      />
    </>
  );
};

export default CustomCursor;
