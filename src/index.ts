import program from './commands';
import Logo from './components/logo';

const main = async () => {
  try {
    Logo.show();

    await program.parseAsync();

    process.exit(0);
  } catch (ex) {
    console.error(ex);
    process.exit(1);
  }
};

main();
