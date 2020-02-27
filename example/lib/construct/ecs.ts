import cdk = require("@aws-cdk/core");
import mycdk = require('../../../');
import ecs = require("@aws-cdk/aws-ecs");
import ecsPatterns =  require("@aws-cdk/aws-ecs-patterns");

export class Ecs extends cdk.Construct {
  constructor(scope: cdk.Construct, id: mycdk.Identifier, props: EcsStackProps) {
    super(scope, id.cdkId)
    const ecsCluster = new ecs.Cluster(this, "Cluster", {
      clusterName: id.stackName,
      vpc: props.vpc,
    });
    const ecsService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, "Service", {
      cluster: this.ecsCluster,
      desiredCount: 1,
      publicLoadBalancer: true,
      domainName: props.domainName,
      domainZone: props.hostedZone,
      certificate: props.certificate,
      taskImageOptions: {
        enableLogging: true,
        logDriver: new ecs.AwsLogDriver({
          streamPrefix: "fargate",
          logGroup: logGroup,
        }),
        containerName: props.containerName,
        containerPort: 3000,
        image: ecs.ContainerImage.fromEcrRepository(props.ecrRepository),
      },
    });
  }
}

