import { useEffect, useRef } from 'react';

function createRootElement(id: string) {
  const rootContainer = document.createElement('div');

  rootContainer.setAttribute('id', id);
  return rootContainer;
}

/**
 * Appends element as last child of body.
 * @param {HTMLElement} rootElem
 */
function addRootElement(rootElem: HTMLElement) {
  document.body.insertBefore(
    rootElem,
    (document.body.lastElementChild as Element).nextElementSibling,
  );
}

function usePortal(id: string) {
  const rootElemRef = useRef<HTMLElement>(null);

  useEffect(
    function setupElement() {
      // Look for existing target dom element to append to
      const existingParent = document.querySelector(`#${id}`);
      // Parent is either a new root or the existing dom element
      const parentElem = existingParent || createRootElement(id);

      // If there is no existing DOM element, add a new one.
      if (!existingParent) {
        addRootElement(parentElem as HTMLElement);
      }

      // Add the detached element to the parent
      parentElem.appendChild(rootElemRef.current as any);

      return function removeElement() {
        rootElemRef.current?.remove();
        if (!parentElem.childElementCount) {
          parentElem.remove();
        }
      };
    },
    [id],
  );

  function getRootElem() {
    if (!rootElemRef.current) {
      (rootElemRef.current as any) = document.createElement('div');
    }
    return rootElemRef.current;
  }

  return getRootElem();
}

export default usePortal;
