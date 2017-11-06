require 'bundler/setup'
require 'html-proofer'

# TODO: Check that depth increases by only 1 for each header,
# And that we always start with h1 (ignore the title h1)
class SingleH1Check < HTMLProofer::Check
  IGNORE_PATHS = [
    'public/admin/index.html',
    'public/index.html'
  ]

  def run
    return if IGNORE_PATHS.include?(@path)

    depth = 0
    count = 0
    @html.css('h1,h2,h3,h4,h5').each do |node|
      css_class = node.attributes['class'].value rescue nil
      if css_class == 'title is-1'
        # Ignore <h1 class="title is-1"> generated from front matter
        next
      end
      node_depth = node.name.match(/h(\d)/)[1].to_i
      if (node_depth - depth) > 1
        # First header was h2, or we went from h1 to h3 without a h2, etc
        if depth == 0
          return add_issue("First header must be a h1, but it was #{node}")
        else
          return add_issue("Can't go from h#{depth} to #{node}")
        end
      end
      depth = node_depth
    end
  end
end

# To speed up local development, external links are only checked in CI:
# https://app.netlify.com/sites/cucumber/settings/deploys
external_link_check = ENV['EXTERNAL_LINK_CHECK'] == 'true'
options = {
  disable_external: !external_link_check,
  checks_to_ignore: ["ScriptCheck", "LinkCheck", "ImageCheck"]
}
path = ARGV[0] || 'public'
if File.file?(path)
  HTMLProofer.check_file(path, options).run
elsif File.directory?(path)
  HTMLProofer.check_directory(path, options).run
else
  raise "No such file or directory: #{path}"
end
