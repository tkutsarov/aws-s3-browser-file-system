import MenuElement from "./MenuElement";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DirMenu = ({data, dirPath, handleDirClick}: {data: any, dirPath: string, handleDirClick: (dirPath: string) => void}) => {
  return (
    <ul>
      {
        Object.keys(data).map((key, index) => {
          if (key.indexOf('.') === -1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const hasSubmenu = Object.values(data[key]).some((value: any) => {
              if (!Object.defineProperty.hasOwnProperty.call(value, 'isFile')) {
                return true;
              }
            })

            const path:string = dirPath === '' ? key : (dirPath + '/' + key);
            
            return (
              <MenuElement key={`${key}-${index}`} itemKey={key} hasSubmenu={hasSubmenu} handleDirClick={handleDirClick} path={path} data={data} />
            );
          }
        })
      }
    </ul>
  );
}

export default DirMenu;
