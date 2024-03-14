import { EffectCallback } from 'react';

export default (effect: EffectCallback) => {
  const ref = useRef<boolean>(true);
  useEffect(() => {
    if (ref.current) {
      effect();
      ref.current = false;
    }
  }, []);
};
