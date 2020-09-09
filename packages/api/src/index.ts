import { Application } from 'app';
import { EventController } from 'controllers';

const app = new Application([new EventController('/events')]);

app.start();
