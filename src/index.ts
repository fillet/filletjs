import Logo from './components/logo';
import Screen from './utils/screen';

const main = async () => {
  try {
    Screen.clear();

    Logo.show();
    process.exit(0);
  } catch (ex) {
    console.error(ex);
    process.exit(1);
  }
};

main();
