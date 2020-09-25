import express from 'express';
import { Parameter, Response, Body } from './Type';
import { io } from '..';

const router = express.Router();

router.get<{}, 'pong', null>('/ping', (_request, response) => response.send('pong'));

router.put<Parameter.ID, Response.Empty, Body.Job>(
  '/job/:id',
  (request, response) => {
    const { id } = request.params;
    const job = request.body;
    io.emit(`job/${id}`, job);
    console.log(`[${id}] ${JSON.stringify(job, null, 2)}`);
    response.end();
  }
);

router.post<Parameter.ID, Response.Empty, Body.Lifetime>(
  '/job/:id/lifetime',
  (request, response) => {
    const { id } = request.params;
    const {start, end} = request.body;
    console.log(`[${id}] ${start} ${end}`);
    response.end();
  }
);

router.post<Parameter.ID, Response.Empty, Body.Status>(
  '/job/:id/status',
  (request, response) => {
    const { id } = request.params;
    const { status } = request.body;
    io.emit(`job/${id}/status`, { status });
    console.log(`[${id}] ${status}`);
    response.end();
  }
);

router.post<Parameter.ID, Response.Empty, Body.Message>(
  '/job/:id/log',
  (request, response) => {
    const { id } = request.params;
    const { message } = request.body;
    io.emit(`job/${id}/log`, { message });
    console.log(`[${id}] ${message}`);
    response.end();
  }
);

router.post<Parameter.ID, Response.Empty, Body.Progress>(
  '/job/:id/progress',
  (request, response) => {
    const { id } = request.params;
    const { completed, pending } = request.body;
    io.emit(`job/${id}/progress`, { completed, pending });
    console.log(`[${id}] (${completed}/${completed + pending})`);
    response.end();
  }
);

router.delete<Parameter.ID, Response.Empty, Body.Empty>(
  '/blueprint/:id',
  (request, response) => {
    const { id } = request.params;
    io.emit(`blueprint/${id}`, { message: 'removed' });
    console.log(`[${id}] removed`);
    response.end();
  }
);

export default router;
