/* eslint-disable class-methods-use-this */
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

const forkHookId = 254454565;
const pullRequestHookId = 214711671;
const pullRequestReviewHookId = 239729647;
const workflowRunHookId = 329862186;
const checkRunHookId = 329862261;

const hookIds = [
  forkHookId,
  pullRequestHookId,
  pullRequestReviewHookId,
  workflowRunHookId,
  checkRunHookId,
];

const hookNames = {
  [forkHookId]: 'Fork',
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

function getLast<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

class Redelivery {
  private tillDate: Date;

  constructor(
    tillDate: string,
  ) {
    this.tillDate = new Date(tillDate);
  }

  async run() {
    await hookIds.reduce(async (prevPromise, hookId) => {
      await prevPromise;
      const log = makeLog(hookId);

      log('START');

      await this.redeliverHook(hookId);

      log('FINISH');
    }, Promise.resolve());
  }

  private async redeliverHook(hookId: number) {
    const log = makeLog(hookId);
    const allDeliveries = [];

    let last: Delivery | undefined;
    let fetchMore = true;
    let count = 0;

    do {
      count++;

      const currentDeliveries = await this.getNextDeliveries(
        hookId,
        last ? last.id : undefined,
      );

      log(`Fetched Deliveries ${count} time`);

      last = getLast(currentDeliveries);

      if (
        !last
        || (
          new Date(last.delivered_at).getTime() < this.tillDate.getTime()
        )
      ) {
        fetchMore = false;
      }

      const failedDeliveries = currentDeliveries.filter((delivery) => (
        delivery.status_code !== 200
      ));

      allDeliveries.push(...failedDeliveries);
    } while (fetchMore);

    log(`Fetched ${allDeliveries.length} deliveries`);

    await allDeliveries.reduceRight(async (prevPromise, delivery, index) => {
      await prevPromise;

      await this.redeliverDelivery(hookId, delivery.id);

      lastProcessed = delivery.id;

      if (index % 50) {
        log(`${index + 1}/${allDeliveries.length} processed`);
      }
    }, Promise.resolve());
  }

  private redeliverDelivery(hookId: number, deliveryId: number) {
    return octokit.request('POST /orgs/{orgName}/hooks/{hookId}/deliveries/{deliveryId}/attempts', {
      orgName,
      hookId,
      deliveryId,
    });
  }

  private async getNextDeliveries(
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
}

function main() {
  const tillDate = process.argv[2];

  if (!tillDate) {
    throw new Error(
      'Usage: npm run redeliver "ISODate"("2022-02-17T16:14:04Z")',
    );
  }

  const redelivery = new Redelivery(tillDate);

  return redelivery.run();
}

main()
  .catch((error) => {
    console.error(error);

    console.log('LAST PROCESSED: ', lastProcessed);
  });
