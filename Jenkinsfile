@Library('jenkins-shared-library@master') _
import dev.techyon.jenkins.pipelines.application.config.ApplicationPipelineConfig
import dev.techyon.jenkins.pipelines.application.config.traits.upload_to_bucket.BucketTraitsListBuilder


ApplicationPipelineConfig config = new ApplicationPipelineConfig();
config.setShouldSkipDeployment(true);
config.setBuildAppCommand("npm install && npm run build");

node_pipeline(config)
