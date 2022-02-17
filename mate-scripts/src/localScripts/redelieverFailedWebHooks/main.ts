/* eslint-disable no-await-in-loop,no-plusplus,no-console */
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

interface Delivery {
  id: number;
  status_code: number;
  delivered_at: string;
  redelivery: boolean;
}

dotenv.config();

const githubToken = process.env.GITHUB_TOKEN;
const orgName = 'mate-academy';

// const forkHookId = 254454565;
const pullRequestHookId = 214711671;
const pullRequestReviewHookId = 239729647;
const workflowRunHookId = 329862186;
const checkRunHookId = 329862261;

const hookIds = [
  // forkHookId,
  pullRequestHookId,
  pullRequestReviewHookId,
  workflowRunHookId,
  checkRunHookId,
];

const hookNames = {
  // [forkHookId]: 'Fork',
  [pullRequestHookId]: 'Pull Request',
  [pullRequestReviewHookId]: 'Pull Request review',
  [workflowRunHookId]: 'Workflow run',
  [checkRunHookId]: 'Check run',
};

let lastProcessed = 0;

const makeLog = (hookId: number) => {
  const hookName = hookNames[hookId as keyof typeof hookNames];

  return (message: string) => console.log(`${hookName}: ${message}`);
};

const octokit = new Octokit({
  auth: githubToken,
});

const successTimestamp = new Date('2022-02-17T16:14:04Z').getTime();

function getLast<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

function toChunks<T>(arr: T[], size = 10): T[][] {
  const chunks = [];

  for (let i = 0; i < arr.length; i += 1) {
    const start = i;
    const end = i + (size - 1) > arr.length - 1
      ? arr.length - 1
      : i + (size - 1);

    const chunk: T[] = [];

    chunks.push(chunk);

    for (let j = start; j <= end; j += 1) {
      chunk.push(arr[j]);
    }

    i = end;
  }

  return chunks;
}

async function getNextDeliveries(
  hookId: number,
  lastId?: number,
): Promise<Delivery[]> {
  const { data: deliveries } = await octokit.request(
    lastId
      ? 'GET /orgs/{orgName}/hooks/{hookId}/deliveries?per_page={perPage}&cursor=v1_{lastId}'
      : 'GET /orgs/{orgName}/hooks/{hookId}/deliveries?per_page={perPage}',
    {
      orgName,
      hookId,
      perPage: 100,
      lastId,
    },
  );

  return deliveries;
}

function redeliverDelivery(hookId: number, deliveryId: number) {
  return octokit.request('POST /orgs/{orgName}/hooks/{hookId}/deliveries/{deliveryId}/attempts', {
    orgName,
    hookId,
    deliveryId,
  });
}

export async function redeliverHook(hookId: number) {
  const log = makeLog(hookId);
  const allDeliveries = [];

  let last: Delivery | undefined;
  let fetchMore = true;
  let count = 0;

  do {
    count++;

    const currentDeliveries = await getNextDeliveries(
      hookId,
      last ? last.id : undefined,
    );

    log(`Fetched Deliveries ${count} time`);

    last = getLast(currentDeliveries);

    if (
      !last
      || (
        new Date(last.delivered_at).getTime() < successTimestamp
      )
    ) {
      fetchMore = false;
    }

    const failedDeliveries = currentDeliveries.filter((delivery) => (
      delivery.status_code === 500
      && !delivery.redelivery
    ));

    allDeliveries.push(...failedDeliveries);
  } while (fetchMore);

  log(`Fetched ${allDeliveries.length} deliveries`);

  const deliveriesChunks = toChunks(allDeliveries);

  log(`${deliveriesChunks.length} chunks created`);

  await deliveriesChunks.reduce(async (prevPromise, chunk, index) => {
    await prevPromise;

    await Promise.all(
      chunk.map(async (delivery) => {
        await redeliverDelivery(hookId, delivery.id);

        lastProcessed = delivery.id;
      }),
    );

    log(`Chunk ${index + 1}/${deliveriesChunks.length} processed`);
  }, Promise.resolve());
}

async function main() {
  await hookIds.reduce(async (prevPromise, hookId) => {
    await prevPromise;
    const log = makeLog(hookId);

    log('START');

    await redeliverHook(hookId);

    log('FINISH');
  }, Promise.resolve());
}

main()
  .catch((error) => {
    console.error(error);

    console.log('LAST PROCESSED: ', lastProcessed);
  });
